import type {
	INodeProperties,
} from 'n8n-workflow';

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
				name: 'Get Account Details',
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
			{
				name: 'Get Account Usage',
				value: 'get_usage',
				action: 'Get account usage',
				description: 'Get the usage of the account',
				routing: {
					request: {
						method: 'GET',
						url: '=/account/usage/{{$parameter.year}}/{{$parameter.month}}/subaccount',
					},
				},
			},
		],
		default: 'get',
	},
];

const accountUsageOperationFields: INodeProperties[] = [
	{
		displayName: 'Year',
		name: 'year',
		type: 'number',
		default: 2023,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['get_usage'],
			},
		},
		required: true,
		description: 'Year of usage',
	},
	{
		displayName: 'Month',
		name: 'month',
		type: 'number',
		default: 3,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['get_usage'],
			},
		},
		required: true,
		description: 'Month of usage as a number - eg March is 3',
	},
];

export const accountFields: INodeProperties[] = [
	// Get usage
	...accountUsageOperationFields,
];
