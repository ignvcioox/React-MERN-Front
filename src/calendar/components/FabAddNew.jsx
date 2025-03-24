import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "#fafafa",
            user: {
                _id: '123',
                name: 'Fazt-Code'
            }
        });
        openDateModal();
    }

    return (
        <button
            className="flex bottom-6 p-4 rounded-full fixed right-6 bg-blue-500"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus text-white" />
        </button>
    )
}
