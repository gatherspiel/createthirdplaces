
import {BaseDynamicComponent} from "../../static/places-js-latest.js";

export class CreateTimerTutorialComponent extends BaseDynamicComponent {

  constructor(){
    super();
  }

  attachHandlersToShadowRoot(shadowRoot) {
    const currentUrl = window.location.href.split('?')[0]

    let shouldChangeUrl = false;
    shadowRoot.addEventListener("click",()=>{
      shouldChangeUrl = true;
    })

    shadowRoot.querySelectorAll("#container > details").forEach((item)=>{
      item.addEventListener("toggle",(event)=>{

        if(shouldChangeUrl){
          const url = new URL(location);

          if(event.newState === "open"){
            url.searchParams.set(event.target.id, "show")
            window.history.pushState({},'',`${currentUrl}?${event.target.id}=show`)
          } else {
            window.history.pushState({},'', currentUrl)

          }
          shouldChangeUrl = false;
        }

      })
    })
  }
  getTemplateStyle() {

    return `
      <style>
        #container > details > summary {
          font-weight: 600;
        }
        
        #container > details[open] {
          border-bottom: 1px solid black;
        }
        
        #guidelines-list li {
          margin-top:1rem;
        }
    
        .summary-level-one {
          font-size:1.5rem;
          margin-top:1rem;
        }
    
        @media screen and (width < 32em) {
          ul {
            padding:0;
          }
        }
      </style>`
  }

  render() {

    const urlParams = new URLSearchParams(document.location.search);

    return `
      <div id="container">
      
        <details id="setup-instructions-component-details" ${urlParams.get("setup-instructions-component-details") ? "open" : ''}>
          <summary class="summary-level-one">
            Getting started
          </summary>
          <p>Instructions for installing the page go here</p>
        </details>
        
        <!--Notes on creating documentation 
          Do not require a build step
          Go through the steps of the tutorial on gatherspiel repo and create the timer. When developing and testing
          the timer changes, make sure I'm directly loading the HTML pages from the filesytsem without using
          vite. This will also be evidence that the tutorial code is correct.
          
          Link to Gatherspiel.com timer after tutorial is done.
        -->
        
  
    `
  }
}