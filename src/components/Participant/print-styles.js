export default function() {
  return `<style>
  #section-to-print {
    font-family: "Roboto", sans-serif;
    font-size: 0.875em;
    margin: 1em 0;
    border-spacing: 0;
  }
  #section-to-print td {
    padding: 0.5em 0;
  }
  #section-to-print tr td:first-child {
    min-width: 200px;
  }
  #section-to-print tr td:nth-child(2) {
    padding-left: 0.85em;
  }
  #section-to-print tr.section td {
    border-top: solid 1px #3f51b5;
  }
  #section-to-print .leading-loose {
    line-height: 2rem;
  }
  </style>`
}
