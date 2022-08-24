import { Lightning, Utils } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
      },
      Button: {
        mount: 0.5,
        x: 480,
        y: 270,
        type: Button,
        label: 'Button',
        onclick: alert('String'),
      },
    }
  }

  _init() {
    this.tag('Background')
      .animation({
        duration: 15,
        repeat: -1,
        actions: [
          {
            t: '',
            p: 'color',
            v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff46730 }, 0.8: { v: 0xfffbb03b } },
          },
        ],
      })
      .start()
  }
}

class Button extends Lightning.Component {
  static _template() {
    return {
      h: 50,
      w: 200,
      rect: true,
      Label: {
        x: 10,
        color: 0xff000000,
        text: { fontSize: 32 },
      },
    }
  }

  set label(value) {
    this.tag('Label').text = value.toString()
  }
}
