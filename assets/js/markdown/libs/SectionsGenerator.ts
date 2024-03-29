export type Isection = [number, number]
export type Isections = Isection[]

let selectors: string[] = []

for (let i = 0; i < 6; i++) {
  selectors.push(`h${i}`, `.cm-header-${i}`)
}

export class SectionsGenerator {
  static fromElement(element: HTMLElement): Isections {
    let titles = element.querySelectorAll(selectors.join(',')) as NodeListOf<HTMLElement>
    let start = 0
    let sections: Isections = []

    titles.forEach((title) => {
      let offsetTop = this.offsetTop(title, element)
      sections.push([start, offsetTop])
      start = offsetTop
    })
    sections.push([start, element.scrollHeight])
    return sections
  }

  private static offsetTop(element: HTMLElement, target: HTMLElement, acc = 0): number {
    if (element === target) {
      return acc
    }
    return this.offsetTop(element.offsetParent as HTMLElement, target, acc + element.offsetTop)
  }

  private static getIndex(y: number, sections: Isections): number {
    return sections.findIndex((section) => {
      return y >= section[0] && y <= section[1]
    })
  }
  static getScrollTop(y: number, sourceSections: Isections, targetSections: Isections): number {
    let index = this.getIndex(y, sourceSections)
    let source = sourceSections[index]
    let percentage = (y - source[0]) / (source[1] - source[0])
    let target = targetSections[index]
    return target[0] + percentage * (target[1] - target[0])
  }
}
