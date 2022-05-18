import { h, Component } from 'preact'
import codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neo.css'
import 'codemirror/mode/markdown/markdown'

interface Iprops {
  value: string
  onReady: (editor: CodeMirror.Editor) => void
}

interface Istate {}

export default class CodeMirror extends Component<Iprops, Istate> {
  render(props: Iprops, state: Istate) {
    return <div></div>
  }

  componentDidMount() {
    let editor = codemirror(this.base as ParentNode, {
      value: this.props.value,
      mode: 'markdown',
      theme: 'neo.css',
      lineWrapping: true,
      viewportMargin: Infinity,
      cursorBlinkRate: 0,
    })
    this.props.onReady(editor)
  }
}
