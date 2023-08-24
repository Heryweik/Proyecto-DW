import { Component } from '@angular/core';

/* Para que angular confie en los html */
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent {

  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';

  editorOptionsHTML = {theme: 'vs-dark', language: 'html'};
  editorOptionsCSS = {theme: 'vs-dark', language: 'css'};
  editorOptionsJS = {theme: 'vs-dark', language: 'javascript'};

  /* Uso DomSanitizer para que no marque errores de seguridad, esto aparece en los videos de spotify */
  constructor(private sanitizer: DomSanitizer) {}

  /* Vemos el resultado de todo el codigo poniendo las etiquetas style para el css y script para js */
  get result(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml( 
      this.htmlCode + '<style>' + this.cssCode + '</style><script>' + this.jsCode + '</script>'
      );
}

}
