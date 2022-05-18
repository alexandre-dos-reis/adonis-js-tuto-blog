import * as Turbo from '@hotwired/turbo'

const TurboHelper = class {
  turboLoadingClass: string
  constructor() {
    this.turboLoadingClass = 'turbo-loading'
    document.addEventListener('turbo:visit', () => {
      document.body.classList.add(this.turboLoadingClass)
    })

    document.addEventListener('turbo:before-render', (event) => {
      const detail = (event as CustomEvent).detail

      if (this.isPreviewRendered()) {
        // this is a preview that has been instantly swapped
        // remove .turbo-loading so the preview starts fully opaque
        detail.newBody.classList.remove(this.turboLoadingClass)
        // start fading out 1 frame later after opacity starts full
        requestAnimationFrame(() => {
          document.body.classList.add(this.turboLoadingClass)
        })
      } else {
        const isRestoration = detail.newBody.classList.contains(this.turboLoadingClass)
        if (isRestoration) {
          // this is a restoration (back button). Remove the class
          // so it simply starts with full opacity
          detail.newBody.classList.remove(this.turboLoadingClass)
          return
        }
        // when we are *about* to render a fresh page
        // we should already be faded out, so start us faded out
        detail.newBody.classList.add(this.turboLoadingClass)
      }
    })

    document.addEventListener('turbo:render', () => {
      if (!this.isPreviewRendered()) {
        // if this is a preview, then we do nothing: stay faded out
        // after rendering the REAL page, we first allow the .turbo-loading to
        // instantly start the page at lower opacity. THEN remove the class
        // one frame later, which allows the fade in
        requestAnimationFrame(() => {
          document.body.classList.remove(this.turboLoadingClass)
        })
      }
    })
  }

  isPreviewRendered() {
    return document.documentElement.hasAttribute('data-turbo-preview')
  }
}
export default new TurboHelper()
