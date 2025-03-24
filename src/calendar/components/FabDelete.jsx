import { useCalendarStore } from '../../hooks'

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

    return (
        <button
            className="flex rounded-full bottom-6 p-6 fixed left-16 bg-red-500"
            onClick={handleDelete}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt text-white" />
        </button >
    )
}
