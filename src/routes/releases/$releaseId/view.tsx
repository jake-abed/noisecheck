import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/releases/$releaseId/view')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/releases/$releaseId/view"!</div>
}
