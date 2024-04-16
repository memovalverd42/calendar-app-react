import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

  const { startDeleteEvent, hasEventSelected } = useCalendarStore();

  const handleClickDelete = () => {
    if (hasEventSelected)
      startDeleteEvent();
  } 

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-danger"
      onClick={ handleClickDelete }
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
  
}
