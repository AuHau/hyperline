import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'
import decorate from 'hyper/decorate'

class HyperLine extends Component {
  static propTypes () {
    return {
      plugins: PropTypes.array.isRequired,
      notify: PropTypes.func
    }
  }

  render () {
    const { plugins, notify, ...props } = this.props
    const leftPlugins = plugins.filter(({ alignment }) => alignment === 'l').map(o => o.component)
    const rightPlugins = plugins.filter(({ alignment }) => alignment === 'r').map(o => o.component)
    const restPlugins = plugins.filter(({ alignment }) => alignment !== 'r' && alignment !== 'l').map(o => o.component)

    return (
      <div className="line" {...props}>
        <div className="left">
          {leftPlugins.map((Component, index) => (
            <div key={index} className="wrapper">
              <Component notify={notify}/>
            </div>
          ))}
        </div>
        <div className="center">
          {restPlugins.map((Component, index) => (
            <div key={index} className="wrapper">
              <Component notify={notify}/>
            </div>
          ))}
        </div>
        <div className="right">
          {rightPlugins.map((Component, index) => (
            <div key={index} className="wrapper">
              <Component notify={notify}/>
            </div>
          ))}
        </div>

        <style jsx>{`
          .line {
            width: 100%;
            overflow: hidden;
            height: 25px;
            font: bold 10px Monospace;
            user-select: none;
            background: rgba(0, 0, 0, 0.08);
            margin: 2px 0;
            margin-left: -12px;
            padding: 0 10px;
            position:relative;
          },
          .left{
            float: left;
            position: relative;
            z-index: 2;
          }
          .center{
            width: 100%;
            text-align: center;
            position: absolute;
            left: 0;
            right: 0;
            z-index: 1;
          }
          .center .wrapper{
            display: inline-block;
            float: none;
          } 
          .right{
            float: right;
          }
          .wrapper {
            padding-left: 10px;
            padding-right: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default decorate(HyperLine, 'HyperLine')
