import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

  const { startDeleteEvent, hasEventSelected } = useCalendarStore();

  const handleClickDelete = () => {
    startDeleteEvent();
  } 

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={ handleClickDelete }
      style={{
        display: hasEventSelected ? 'block' : 'none'
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
