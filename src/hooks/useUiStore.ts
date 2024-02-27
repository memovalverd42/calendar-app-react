import { useAppDispatch, useAppSelector } from "."
import { onCloseDateModal, onOpenDateModal } from "../store";

/**
 * Custom hook para manejar el estado de la UI
 */
export const useUiStore = () => {

  const { isDateModalOpen } = useAppSelector( state => state.ui );
  const dispatch = useAppDispatch();

  const openDateModal = () => {
    dispatch( onOpenDateModal() );
  }

  const closeDateModal = () => {
    dispatch( onCloseDateModal() );
  }

  const toggleDateModal = () => {
    if ( isDateModalOpen ) {
      closeDateModal();
    } else {
      openDateModal();
    }
  }

  return {
    //* Properties
    isDateModalOpen,
    //* Methods
    openDateModal,
    closeDateModal,
    toggleDateModal
  }

}
