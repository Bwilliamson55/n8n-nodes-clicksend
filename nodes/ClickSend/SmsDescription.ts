import type {
	INodeProperties,
} from 'n8n-workflow';

export const smsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sms'],
			},
		},
		options: [
			{
				name: 'Get SMS History',
				value: 'get_history',
				action: 'Get SMS history',
				description: 'Get the SMS history of the account',
				routing: {
					request: {
						method: 'GET',
						url: '/sms/history',
					},
				},
			},
			{
				name: 'Calculate SMS Price',
				value: 'get_price',
				action: 'Calculate SMS price',
				description: 'Get the calculated price of an SMS without sending',
				routing: {
					request: {
						method: 'POST',
						url: '/sms/price',
					},
				},
			},
			{
				name: 'Send SMS',
				value: 'send',
				action: 'Send SMS',
				description: 'Send SMS message(s)',
				routing: {
					request: {
						method: 'POST',
						url: '/sms/send',
					},
				},
			},
		],
		default: 'get_history',
	},
];

const smsHistoryOperationFields: INodeProperties[] = [
	{
		displayName: 'From Date',
		name: 'date_from',
		description: 'Date range start for SMS history',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['get_history'],
			},
		},
		routing: {
			request: {
				qs: {
					date_from: '={{ $value ? Math.floor(new Date($value).getTime() / 1000) : null }}',
				},
			},
		},
	},
	{
		displayName: 'To Date',
		name: 'date_to',
		description: 'Date range end for SMS history',
		type: 'dateTime',
		default: null,
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['get_history'],
			},
		},
		routing: {
			request: {
				qs: {
					date_to: '={{ $value ? Math.floor(new Date($value).getTime() / 1000) : null }}',
				},
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		description: 'Page of results to start on',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['get_history'],
			},
		},
		routing: {
			request: {
				qs: {
					page: '={{ $value ?? 1 }}',
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		description: 'Max number of results to return',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['get_history'],
			},
		},
		routing: {
			request: {
				qs: {
					limit: '={{ $value ?? 1 }}',
				},
			},
		},
	},
];

const smsSendOperationFields: INodeProperties[] = [
	{
		displayName: 'SMS Messages',
		name: 'smsMessagesArray',
		default: {},
		description: 'Array of SMS messages to send',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['send'],
			},
		},
		options: [
			{
				name: 'messagesArray',
				displayName: 'SMS Message',
				values: [
					{
						displayName: 'Body',
						name: 'body',
						description: 'Your message',
						type: 'string',
						default: '',
						required: true,
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].body',
								type: 'body',
							},
						},
						placeholder: 'Hello from n8n!',
					},
					{
						displayName: 'To',
						name: 'to',
						description: 'Recipient phone number in E.164 format',
						type: 'string',
						default: '+61411111111',
						required: true,
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].to',
								type: 'body',
							},
						},
						placeholder: '+61411111111',
					},
					{
						displayName: 'Source Name',
						name: 'source',
						description: 'Your method of sending e.g. \'wordpress\', \'php\', \'c#\'',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].source',
								type: 'body',
							},
						},
						placeholder: 'n8n',
					},
					{
						displayName: 'Schedule',
						name: 'schedule',
						description: 'Leave blank for immediate delivery',
						type: 'dateTime',
						default: null,
						routing: {
							send: {
								value: '={{ $value ? Math.floor(new Date($value).getTime() / 1000) : null }}',
								property: '=messages[{{$index}}].schedule',
								type: 'body',
							},
						},
					},
					{
						displayName: 'Custom String',
						name: 'custom_string',
						description: 'Your reference. Will be passed back with all replies and delivery reports.',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].custom_string',
								type: 'body',
							},
						},
						placeholder: 'my-custom-string',
					},
					{
						displayName: 'List ID',
						name: 'list_id',
						description: 'Your list ID if sending to a whole list. Can be used instead of "to".',
						type: 'number',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].list_id',
								type: 'body',
							},
						},
					},
					{
						displayName: 'Country Code',
						name: 'country',
						description: 'ISO alpha-2 character country code e.g. "US", we use this to format the recipient number if its not in international format',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].country',
								type: 'body',
							},
						},
						placeholder: 'AU',
					},
					{
						displayName: 'From Email',
						name: 'from_email',
						description: 'An email address where the reply should be emailed to. If omitted, the reply will be emailed back to the user who sent the outgoing SMS.',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].from_email',
								type: 'body',
							},
						},
					},
				],
			},
		],
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add SMS Message',
		type: 'fixedCollection',
	},
];

const smsPriceOperationFields: INodeProperties[] = [
	{
		displayName: 'SMS Messages',
		name: 'smsMessagesArray',
		default: {},
		description: 'Array of SMS messages to calculate the price of sending',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['get_price'],
			},
		},
		options: [
			{
				name: 'priceMessagesArray',
				displayName: 'SMS Message',
				values: [
					{
						displayName: 'Body',
						name: 'body',
						description: 'Your message',
						type: 'string',
						default: '',
						required: true,
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].body',
								type: 'body',
							},
						},
						placeholder: 'Hello from n8n!',
					},
					{
						displayName: 'To',
						name: 'to',
						description: 'Recipient phone number in E.164 format',
						type: 'string',
						default: '+61411111111',
						required: true,
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].to',
								type: 'body',
							},
						},
						placeholder: '+61411111111',
					},
					{
						displayName: 'Source Name',
						name: 'source',
						description: 'Your method of sending e.g. \'wordpress\', \'php\', \'c#\'',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].source',
								type: 'body',
							},
						},
						placeholder: 'n8n',
					},
					{
						displayName: 'Schedule',
						name: 'schedule',
						description: 'Leave blank for immediate delivery',
						type: 'dateTime',
						default: null,
						routing: {
							send: {
								value: '={{ $value ? Math.floor(new Date($value).getTime() / 1000) : null }}',
								property: '=messages[{{$index}}].schedule',
								type: 'body',
							},
						},
					},
					{
						displayName: 'Custom String',
						name: 'custom_string',
						description: 'Your reference. Will be passed back with all replies and delivery reports.',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].custom_string',
								type: 'body',
							},
						},
						placeholder: 'my-custom-string',
					},
					{
						displayName: 'List ID',
						name: 'list_id',
						description: 'Your list ID if sending to a whole list. Can be used instead of "to".',
						type: 'number',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].list_id',
								type: 'body',
							},
						},
					},
					{
						displayName: 'Country Code',
						name: 'country',
						description: 'ISO alpha-2 character country code e.g. "US", we use this to format the recipient number if its not in international format',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].country',
								type: 'body',
							},
						},
						placeholder: 'AU',
					},
					{
						displayName: 'From Email',
						name: 'from_email',
						description: 'An email address where the reply should be emailed to. If omitted, the reply will be emailed back to the user who sent the outgoing SMS.',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].from_email',
								type: 'body',
							},
						},
					},
				],
			},
		],
		placeholder: 'Add SMS Message',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
	},
];

export const smsFields: INodeProperties[] = [
	...smsHistoryOperationFields,
	...smsSendOperationFields,
	...smsPriceOperationFields
];
