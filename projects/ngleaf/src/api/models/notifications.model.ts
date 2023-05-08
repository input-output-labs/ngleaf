export type LeafNotificationChannel = 'UI' | 'EMAIL'| 'WS';
export type LeafNotificationChannelSendingStatus = 'CREATED' | 'SKIP_NO_CONFIG' | 'SKIP_PER_CONFIG' | 'UI_SEEN' | 'EMAIL_SENT' | 'WS_SENT';

export interface LeafNotificationModel {
  id: String;
	code: String;
	targetAccountId: String;
	creationDate: Date;
	payload: any;
  channelSendingStatus: {[key in LeafNotificationChannel]: LeafNotificationChannelSendingStatus};
}
