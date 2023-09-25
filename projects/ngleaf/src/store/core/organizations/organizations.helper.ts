import { LeafAccountModel, LeafOrganization } from "../../../api/models";
import { AsyncType, asyncTypeSuccess } from "../../common";

export function setOrganizationUsersById(asyncOrganizations: AsyncType<LeafOrganization[]>, organizationId?: string, users?: LeafAccountModel[]): AsyncType<LeafOrganization[]> {
  if (asyncOrganizations.status.pending === undefined || asyncOrganizations.status.pending || asyncOrganizations.status.failure || !asyncOrganizations.data || !organizationId) {
    return asyncOrganizations;
  }
  const organizations = asyncOrganizations.data;
  const organizationsCopy = [...organizations];
  const organizationIndex = organizationsCopy.findIndex((organization) => organization.id === organizationId);

  if (organizationIndex >= 0) {
    organizationsCopy[organizationIndex] = {
      ...organizationsCopy[organizationIndex],
      members: organizationsCopy[organizationIndex].members.map((member) => ({
        ...member,
        user: users.find(user => member.accountId === user.id)
      }))
    };
  }
  return asyncTypeSuccess(asyncOrganizations, organizationsCopy);
}
