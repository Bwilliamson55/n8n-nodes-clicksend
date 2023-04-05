/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { accountOperations } from './AccountDescription';

export class ClickSend implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ClickSend',
		name: 'clickSend',
		icon: 'file:clicksend.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume ClickSend API',
		defaults: {
			name: 'ClickSend',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'clickSendApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://rest.clicksend.com/v3',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'SMS',
						value: 'sms',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
						name: 'MMS',
						value: 'mms',
					},
				],
				default: 'account',
			},
			...accountOperations,
		],
	};
}
