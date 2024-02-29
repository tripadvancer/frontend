import { PlaceAdd } from '@/components/features/place-form/place-add'
import { ProtectClientRoute } from '@/components/ui/protect-client-route'

export default function AddPlacePage() {
    return (
        <ProtectClientRoute>
            <PlaceAdd />
        </ProtectClientRoute>
    )
}
