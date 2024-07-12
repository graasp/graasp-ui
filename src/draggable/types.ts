export type DraggableAndDroppableProps = {
  isDragging: boolean;
  isOver: boolean;
  isMovable: boolean;
};

export type DroppedFile = {
  dataTransfer: DataTransfer;
  files: File[];
  items: DataTransferItemList;
};
