import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Area, InnerArea } from './Styled'
import { DropTarget } from 'react-dnd'
import DragImage from '../DragImage'
import ResizableImage from '../ResizableImage'
import CanvasImage from '../CanvasImage'
import WebView from '../WebView'
import { reCalcSizeWithZoom, canvasTopOffset, canvasLeftOffset } from '../utils/calcZoom'
import Constants from '../constants'
const { EDIT_MODES } = Constants

const squareTarget = {
  drop(props, monitor) {
    const sourceOffset = monitor.getSourceClientOffset()
    const item = monitor.getItem()
    const zoomLevel = props.zoomLevel
    const x = reCalcSizeWithZoom(sourceOffset.x - canvasLeftOffset, zoomLevel)
    const y = reCalcSizeWithZoom(sourceOffset.y - canvasTopOffset, zoomLevel)
    props.onUpdate(item.id, {
      x,
      y,
      width: item.width,
      height: item.height,
      depth: item.depth,
    })
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

class DndArea extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    selectedItemId: PropTypes.string,
    zoomLevel: PropTypes.number,
    connectDropTarget: PropTypes.func,
    isCanvasGridView: PropTypes.bool,
    editMode: PropTypes.string,
    onResize: PropTypes.func,
    webview: PropTypes.object,
    pins: PropTypes.array,
    onUpdateWebView: PropTypes.func,
    onAddPin: PropTypes.func,
    onDeletePin: PropTypes.func,
  }

  render() {
    const {
      items,
      connectDropTarget,
      onSelect,
      selectedItemId,
      zoomLevel,
      isCanvasGridView,
      editMode,
      onUpdate,
      webview,
      onUpdateWebView,
    } = this.props

    return (
      <Area ref={instance => connectDropTarget(instance)}>
        <InnerArea isGrid={isCanvasGridView}>
          {editMode === EDIT_MODES.dnd &&
            items.map((item, i) => (
              <DragImage
                key={i}
                item={item}
                onSelect={onSelect}
                selectedItemId={selectedItemId}
                zoomLevel={zoomLevel}
              />
            ))}
          {editMode === EDIT_MODES.resize &&
            items.map((item, i) => (
              <ResizableImage
                key={i}
                item={item}
                onSelect={onSelect}
                selectedItemId={selectedItemId}
                zoomLevel={zoomLevel}
                onResize={onUpdate}
              />
            ))}
          {editMode === EDIT_MODES.webview && (
            <Fragment>
              <WebView onChange={onUpdateWebView} data={webview} zoomLevel={zoomLevel} />
              {items.map((item, i) => (
                <CanvasImage
                  key={i}
                  item={item}
                  onSelect={onSelect}
                  selectedItemId={selectedItemId}
                  zoomLevel={zoomLevel}
                />
              ))}
            </Fragment>
          )}
          {editMode === EDIT_MODES.annotation &&
            items.map((item, i) => (
              <CanvasImage
                key={i}
                item={item}
                onSelect={onSelect}
                selectedItemId={selectedItemId}
                zoomLevel={zoomLevel}
              />
            ))}
        </InnerArea>
      </Area>
    )
  }
}

export default DropTarget('any', squareTarget, collect)(DndArea)
