import RoomsHero from '@/components/module/rooms/RoomsHero';
import RoomsPage from '@/components/module/rooms/RoomsPage';

export const dynamic = "force-dynamic";
const RoomPages = () => {
    return (
        <div>
            <RoomsHero />
            <RoomsPage />
        </div>
    );
};

export default RoomPages;