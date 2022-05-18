import CodeMirror from './CodeMirror'
import { h, Component, JSX } from 'preact'
import './mdEditor.scss'
import Preview from './Preview'
import { Editor } from 'codemirror'
import { Bold, Italic, Fullscreen, Speech } from './Buttons'
import { Isections, SectionsGenerator } from './libs/SectionsGenerator'
import { debounce } from 'lodash'

interface Iprops {
  value: string | null
  name: string | null
}

interface Istate {
  content: string
  editor: Editor | null
  fullscreen: boolean
}

interface EditorSections {
  editor: Isections
  preview: Isections
  [key: string]: Isections
}

export default class EditorComponent extends Component<Iprops, Istate> {
  private sections: EditorSections | null = null
  private $editor?: HTMLElement
  private $preview?: HTMLElement
  private scrollingSection: string | null = null

  constructor(props: Iprops) {
    super(props)
    this.state = {
      content: props.value || '',
      editor: null,
      fullscreen: false,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resetSections)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetSections)
  }

  componentDidUpdate(prevProps: Iprops, prevState: Istate) {
    if (prevState.fullscreen !== this.state.fullscreen) {
      if (this.state.editor) {
        this.state.editor.refresh()
      }
    }

    this.sections = null
    const base = this.base as HTMLDivElement
    this.$editor = base?.querySelector('.md-editor-editor') as HTMLDivElement
    this.$preview = base?.querySelector('.md-editor-preview') as HTMLDivElement
  }

  private getSections(): EditorSections | null {
    if (this.sections === null && this.$editor && this.$preview) {
      this.sections = {
        editor: SectionsGenerator.fromElement(this.$editor),
        preview: SectionsGenerator.fromElement(this.$preview),
      }
    }
    return this.sections
  }

  private resetSections = () => {
    this.sections = null
  }

  render({ name }: Iprops, { content, editor, fullscreen }: Istate): JSX.Element {
    let cls = 'md-editor'
    if (fullscreen) {
      cls += ' md-editor-fullscreen'
    }
    return (
      <div class={cls}>
        <div class="md-editor-toolbar">
          <div className="md-editor-toolbar-left">
            {editor && [
              <Bold editor={editor} />,
              <Italic editor={editor} />,
              <Speech editor={editor} />,
            ]}
          </div>
          <div className="md-editor-toolbar-right">
            {editor && [<Fullscreen fullscreen={fullscreen} onClick={this.toggleFullscreen} />]}
          </div>
        </div>
        <div class="md-editor-editor" onScroll={this.onScroll}>
          <CodeMirror value={content} onReady={this.setEditor} />
        </div>
        <div class="md-editor-preview" onScroll={this.onScroll}>
          <Preview markdown={content} />
        </div>
        <textarea name={name || ''} style="display: none;">
          {content}
        </textarea>
      </div>
    )
  }

  setEditor = (editor: Editor): void => {
    this.setState({ editor })
    editor.on('change', (e) => {
      this.setState({ content: e.getDoc().getValue() })
    })
  }

  toggleFullscreen = () => {
    this.setState({
      fullscreen: !this.state.fullscreen,
    })
  }

  onScroll = (e: UIEvent) => {
    let sections = this.getSections()
    if (sections === null) return
    let eventTarget = e.target as HTMLDivElement
    let source = eventTarget === this.$editor ? 'editor' : 'preview'
    if (this.scrollingSection === null) {
      this.scrollingSection = source
    } else if (this.scrollingSection !== source) {
      return
    }
    let target = source === 'editor' ? 'preview' : 'editor'
    let $source = eventTarget
    let $target = eventTarget === this.$editor ? this.$preview : this.$editor
    let scrollTop = SectionsGenerator.getScrollTop(
      $source.scrollTop,
      sections[source],
      sections[target]
    )
    if ($target) {
      $target.scrollTop = scrollTop
    }
    this.resetScrolling()
  }

  private resetScrolling = debounce(() => {
    this.scrollingSection = null
  }, 500)
}
