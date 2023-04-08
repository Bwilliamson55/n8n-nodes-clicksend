import {
	type INodeProperties,
} from 'n8n-workflow';

export const mmsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['mms'],
			},
		},
		options: [
			{
				name: 'Get MMS History',
				value: 'get_history',
				action: 'Get MMS history',
				description: 'Get the MMS history of the account',
				routing: {
					request: {
						method: 'GET',
						url: '/mms/history',
					},
				},
			},
			{
				name: 'Calculate MMS Price',
				value: 'get_price',
				action: 'Calculate MMS price',
				description: 'Get the calculated price of an MMS without sending',
				routing: {
					request: {
						method: 'POST',
						url: '/mms/price',
					},
				},
			},
			{
				name: 'Send MMS',
				value: 'send',
				action: 'Send MMS',
				description: 'Send MMS message(s)',
				routing: {
					request: {
						method: 'POST',
						url: '/mms/send',
					},
				},
			},
		],
		default: 'get_history',
	},
];

const mmsHistoryOperationFields: INodeProperties[] = [
	{
		displayName: 'From Date',
		name: 'date_from',
		description: 'Date range start for MMS history',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['mms'],
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
		description: 'Date range end for MMS history',
		type: 'dateTime',
		default: null,
		displayOptions: {
			show: {
				resource: ['mms'],
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
				resource: ['mms'],
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
				resource: ['mms'],
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

const mmsSendOperationFields: INodeProperties[] = [
	{
		displayName: 'Media File URL',
		name: 'media_file',
		description: 'URL of the media file you want to send - to convert before sending use this nodes upload operation first',
		type: 'string',
		default: '',
		required: true,
		routing: {
			send: {
				value: '={{$value}}',
				property: 'media_file',
				type: 'body',
			},
		},
		displayOptions: {
			show: {
				resource: ['mms'],
				operation: ['send'],
			},
		},
		placeholder: 'http://yourdomain.com/tpLaX6A.gif',
	},
	{
		displayName: 'MMS Messages',
		name: 'mmsMessagesArray',
		default: {},
		description: 'Array of MMS messages to send',
		displayOptions: {
			show: {
				resource: ['mms'],
				operation: ['send'],
			},
		},
		options: [
			{
				name: 'messagesArray',
				displayName: 'MMS Message',
				values: [
					{
						displayName: 'Subject',
						name: 'subject',
						description: 'Subject line max 20 characters',
						type: 'string',
						default: '',
						required: true,
						routing: {
							send: {
								value: '={{$value.substr(0,20)}}',
								property: '=messages[{{$index}}].subject',
								type: 'body',
							},
						},
						placeholder: 'Hello from n8n!',
					},
					{
						displayName: 'From',
						name: 'from',
						description: 'Your sender ID - empty defaults to the API keys owner',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].from',
								type: 'body',
							},
						},
					},
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
				],
			},
		],
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add MMS Message',
		type: 'fixedCollection',
	},
];

const mmsPriceOperationFields: INodeProperties[] = [
	{
		displayName: 'Media File URL',
		name: 'media_file',
		description: 'URL of the media file you want to send - to convert before sending use this nodes upload operation first',
		type: 'string',
		default: '',
		required: true,
		routing: {
			send: {
				value: '={{$value}}',
				property: 'media_file',
				type: 'body',
			},
		},
		displayOptions: {
			show: {
				resource: ['mms'],
				operation: ['get_price'],
			},
		},
		placeholder: 'http://yourdomain.com/tpLaX6A.gif',
	},
	{
		displayName: 'MMS Messages',
		name: 'mmsMessagesArray',
		default: {},
		description: 'Array of MMS messages to calculate the price of sending send',
		displayOptions: {
			show: {
				resource: ['mms'],
				operation: ['get_price'],
			},
		},
		options: [
			{
				name: 'messagesArray',
				displayName: 'MMS Message',
				values: [
					{
						displayName: 'Subject',
						name: 'subject',
						description: 'Subject line max 20 characters',
						type: 'string',
						default: '',
						required: true,
						routing: {
							send: {
								value: '={{$value.substr(0,20)}}',
								property: '=messages[{{$index}}].subject',
								type: 'body',
							},
						},
						placeholder: 'Hello from n8n!',
					},
					{
						displayName: 'From',
						name: 'from',
						description: 'Your sender ID - empty defaults to the API keys owner',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=messages[{{$index}}].from',
								type: 'body',
							},
						},
					},
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
				],
			},
		],
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add MMS Message',
		type: 'fixedCollection',
	},
];

export const mmsFields: INodeProperties[] = [
	// Get mms history from and to
	...mmsHistoryOperationFields,
	...mmsSendOperationFields,
	...mmsPriceOperationFields
];
