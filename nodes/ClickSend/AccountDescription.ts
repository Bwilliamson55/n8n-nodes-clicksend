import type {
	INodeProperties,
} from 'n8n-workflow';
// import { SendInBlueNode } from './GenericFunctions';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get account details',
				description: 'Get the details of the account',
				routing: {
					request: {
						method: 'GET',
						url: '/account',
					},
				},
			},
		],
		default: 'get',
	},
];
