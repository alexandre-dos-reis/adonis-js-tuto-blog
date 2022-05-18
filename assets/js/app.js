import 'bootstrap/dist/js/bootstrap.min.js'
import '../scss/app.scss'
import './animation/turbo'
import './customElements/Autogrow'
import EditorComponent from './markdown/Editor'
import register from 'preact-custom-element'

register(EditorComponent, 'editor-component', ['name', 'value'])
