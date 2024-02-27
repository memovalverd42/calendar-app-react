import { addHours } from "date-fns";
import { IEvent } from "..";
import { useCalendarStore, useUiStore } from "../../hooks"

const emptyEvent: IEvent = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "",
    name: ""
  }
}

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent( emptyEvent );
    openDateModal();
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={ handleClickNew }
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
