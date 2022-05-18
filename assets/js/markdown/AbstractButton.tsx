import { h, Component, JSX } from 'preact'
import { Editor } from 'codemirror'

export interface ButtonProps {
  editor?: Editor
}

interface Istate {}

export abstract class AbstractButton<
  Tprops extends ButtonProps = ButtonProps,
  Tstate = Istate
> extends Component<Tprops, Tstate> {
  shortcut: null | string = null

  componentDidMount() {
    if (this.shortcut && this.props.editor) {
      this.props.editor.setOption('extraKeys', {
        [this.shortcut]: () => this.action(this.props.editor),
      })
    }
  }

  render(props?: Tprops, state?: Tstate) {
    return <button onClick={this.onClick}>{this.icon()}</button>
  }

  private onClick = (e: MouseEvent): void => {
    e.preventDefault()
    this.action(this.props.editor)
  }

  action(editor?: Editor): void {}

  icon(): null | JSX.Element {
    return null
  }
}
