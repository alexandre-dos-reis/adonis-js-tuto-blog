import { Editor } from 'codemirror'
import { h } from 'preact'
import { AbstractButton, ButtonProps } from '../AbstractButton'

interface Iprops extends ButtonProps {
  editor: Editor
}

interface Istate {
  listening: boolean
}

export default class SpeechButton extends AbstractButton<Iprops, Istate> {
  shortcut = ''
  recognition?: SpeechRecognition

  constructor(props: Iprops) {
    super(props)
    this.recognition = new webkitSpeechRecognition()
    this.recognition.lang = 'fr-FR'
    this.recognition.continuous = true
    this.recognition.interimResults = false
    this.state = {
      listening: false,
    }
  }

  icon() {
    if (this.recognition === undefined) {
      return null
    }
    if (this.state.listening) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-mic"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
        </svg>
      )
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-mic-fill"
          viewBox="0 0 16 16"
        >
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
        </svg>
      )
    }
  }
  action(editor: Editor) {
    if (this.recognition === undefined) {
      return
    }

    if (this.state.listening) {
      this.recognition.stop()
      this.setState({ listening: false })
      return
    }
    this.recognition.start()
    this.setState({ listening: true })
    this.recognition.onresult = (e) => {
      let result = e.results.item(e.resultIndex)
      if (result.isFinal === true) {
        let transcript = result.item(0).transcript
        if (this.shouldCapitalize()) {
          transcript = SpeechButton.capitalize(transcript)
        }
        editor.getDoc().replaceSelection(transcript)
      }
    }
  }

  shouldCapitalize(): boolean {
    let cursor = this.props.editor.getDoc().getCursor()
    let prevSentence = this.props.editor
      .getDoc()
      .getRange(
        {
          line: cursor.line,
          ch: 0,
        },
        cursor
      )
      .trim()
    return cursor.ch === 0 || prevSentence.endsWith('.')
  }

  static capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
