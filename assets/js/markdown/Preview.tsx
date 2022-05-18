import { h, Component } from 'preact'
import { marked } from 'marked'

interface Iprops {
  markdown: string
}

export default class Preview extends Component<Iprops, {}> {
  constructor(props: Iprops) {
    super(props)
  }

  get html(): string {
    return marked.parse(this.props.markdown, {
      gfm: true,
      breaks: true,
      sanitize: false, //https://marked.js.org/using_advanced
      smartLists: true,
      smartypants: false,
    })
  }

  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.html }}></div>
  }
}
