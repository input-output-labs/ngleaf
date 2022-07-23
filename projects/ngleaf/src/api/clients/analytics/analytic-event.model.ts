export interface AnalyticEvent {
  sessionId: string;
	accountId?: string;
	category: string;
	name: string;
	payload?: any;
}
