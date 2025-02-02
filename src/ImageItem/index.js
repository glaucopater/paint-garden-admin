import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Image, Icons } from './Styled'
import api from '../utils/api'
import { ImageType } from '../types'
import { Icon } from '../Sections/Styled'
import edit from '../assets/edit.svg'
import trash from '../assets/trash_.svg'

const ImageItem = ({ item, onDelete }) => (
  <Wrapper>
    <Image src={api.getImageUrl(item.filePath)} alt={'thumb'} />
    <Icons>
      <Icon src={edit} />
      <Icon src={trash} onClick={() => onDelete(item.id)} />
    </Icons>
  </Wrapper>
  )

ImageItem.propTypes = {
  item: ImageType.isRequired,
  onDelete: PropTypes.func,
}

export default ImageItem
