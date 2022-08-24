import { Lightning } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
  // static _template() {
  //   return {
  //     Background: {
  //       w: 1920,
  //       h: 1080,
  //       color: 0xfffbb03b,
  //       src: Utils.asset('images/background.png'),
  //     },
  //     Button: {
  //       mount: 0.5,
  //       x: 480,
  //       y: 270,
  //       type: Button,
  //       label: 'Button',
  //       onclick: alert('String'),
  //     },
  //   }
  // }

  static _template() {
    return {
      x: 20,
      y: 20,
      Buttons: {
        LeftButton: { type: ExampleButton, buttonText: 'Left' },
        RightButton: { x: 200, type: ExampleButton, buttonText: 'Right' },
      },
      List: { y: 100, type: ExampleList },
    }
  }
  _init() {
    this.buttonIndex = 0
    this.tag('List').items = [1, 2, 3, 4].map(i => ({ label: i }))
    this._setState('Buttons')
  }
  _handleUp() {
    this._setState('Buttons')
  }
  _handleDown() {
    this._setState('List')
  }
  static _states() {
    return [
      class Buttons extends this {
        _handleLeft() {
          this.buttonIndex = 0
        }
        _handleRight() {
          this.buttonIndex = 1
        }
        _getFocused() {
          return this.tag('Buttons').children[this.buttonIndex]
        }
      },
      class List extends this {
        _getFocused() {
          return this.tag('List')
        }
      },
    ]
  }

  // _init() {
  //   this.tag('Background')
  //     .animation({
  //       duration: 15,
  //       repeat: -1,
  //       actions: [
  //         {
  //           t: '',
  //           p: 'color',
  //           v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff46730 }, 0.8: { v: 0xfffbb03b } },
  //         },
  //       ],
  //     })
  //     .start()
  // }
}

// class Button extends Lightning.Component {
//   static _template() {
//     return {
//       h: 50,
//       w: 200,
//       rect: true,
//       Label: {
//         x: 10,
//         color: 0xff000000,
//         text: { fontSize: 32 },
//       },
//     }
//   }

//   set label(value) {
//     this.tag('Label').text = value.toString()
//   }
// }

class ExampleButton extends Lightning.Component {
  static _template() {
    return {
      color: 0xff1f1f1f,
      texture: Lightning.Tools.getRoundRect(150, 40, 4),
      Label: {
        x: 75,
        y: 22,
        mount: 0.5,
        color: 0xffffffff,
        text: { fontSize: 20 },
      },
    }
  }
  _init() {
    this.tag('Label').patch({ text: { text: this.buttonText } })
  }
  _focus() {
    this.color = 0xffffffff
    this.tag('Label').color = 0xff1f1f1f
  }
  _unfocus() {
    this.color = 0xff1f1f1f
    this.tag('Label').color = 0xffffffff
  }
}

class ExampleList extends Lightning.Component {
  static _template() {
    return {}
  }
  _init() {
    this.index = 0
  }
  set items(items) {
    this.children = items.map((item, index) => {
      return {
        ref: 'ListItem-' + index, //optional, for debug purposes
        type: ExampleListItem,
        x: index * 70, //item width + 20px margin
        item, //passing the item as an attribute
      }
    })
  }
  _getFocused() {
    return this.children[this.index]
  }
  _handleLeft() {
    if (this.index > 0) {
      this.index--
    }
  }
  _handleRight() {
    // we don't know exactly how many items the list can have
    // so we test it based on this component's child list
    if (this.index < this.children.length - 1) {
      this.index++
    }
  }
}

class ExampleListItem extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 50,
      h: 50,
      color: 0xffff00ff,
      alpha: 0.8,
      Label: {
        x: 25,
        y: 30,
        mount: 0.5,
      },
    }
  }
  _init() {
    this.patch({ Label: { text: { text: this.item.label } } })
  }
  _focus() {
    this.patch({ smooth: { alpha: 1, scale: 1.2 } })
  }
  _unfocus() {
    this.patch({ smooth: { alpha: 0.8, scale: 1 } })
  }
}
