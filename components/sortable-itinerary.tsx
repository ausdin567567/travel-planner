import { Location } from "@/app/generated/prisma"
import {DndContext, closestCenter, DragEndEvent} from '@dnd-kit/core'
import {arrayMove, SortableContext, verticalListSortingStrategy, useSortable} from '@dnd-kit/sortable'
import { useId, useState } from "react";

interface SortableItineraryProps{
    locations: Location[];
    tripId: string;
}

function SortableItem({item}: {item: Location}){
    return <div className="p-4 border rounded-md flex justify-between items-center hover:shadow transition-shadow">
        <div>
            <h4 className="font-medium text-gray-800">{item.locationTitle}</h4>
            <p className="text-sm text-gray-500 truncate max-w-xs">{`Latitude: ${item.lat}, Longitude: ${item.lng}`}</p>
        </div>
    </div>
}


export default function SortableItinerary({
    locations, 
    tripId
}: SortableItineraryProps){
    const id = useId()
    const [localLocation, setLocalLocation] = useState(locations)
    const handleDragEnd = async (event: DragEndEvent) => {};

    return (
    <DndContext 
        id={id} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
    >
        <SortableContext 
        items={localLocation.map((loc) => loc.id)} 
        strategy={verticalListSortingStrategy}
        >
            <div className="space-y-4">
                {localLocation.map((item, key) => (
                    <SortableItem key={key} item={item} />
                ))}
            </div>
        </SortableContext>
    </DndContext>
    );
}