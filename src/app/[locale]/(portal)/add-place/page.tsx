import { AddPlace } from '@/components/features/place-form/add-place'
import { ProtectClientRoute } from '@/components/ui/protect-client-route'

export default function AddPlacePage() {
    return <ProtectClientRoute component={<AddPlace />} />
}
