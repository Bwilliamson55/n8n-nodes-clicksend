import {
	type INodeProperties,
	NodeOperationError,
} from 'n8n-workflow';

export const uploadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['upload'],
			},
		},
		options: [
			{
				name: 'Upload Media File',
				value: 'upload',
				action: 'Upload media file',
				description: 'The upload endpoint provides a method for converting files from an unsupported format to a format that one of our endpoints can handle',
				routing: {
					request: {
						method: 'POST',
						url: '/uploads',
					},
				},
			},
		],
		default: 'upload',
	},
];

const uploadOperationFields: INodeProperties[] = [
	{
		displayName: 'Convert to Type',
		name: 'convert',
		description: 'Convert to Be Compatible with Type chosen',
		type: 'options',
		required: true,
		default: '',
		options: ['fax','mms','csv','post','postcard'].map((t) =>{ return {name: t, value: t, action: `convert upload for ${t}`}}),
		displayOptions: {
			show: {
				resource: ['upload'],
				operation: ['upload'],
			},
		},
		routing: {
			request: {
				qs: {
					convert: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Input Data Field Name',
		default: 'data',
		name: 'binaryPropertyName',
		type: 'string',
		description:
			'The name of the incoming field containing the binary file data to be processed',
		displayOptions: {
			show: {
				resource: ['upload'],
				operation: ['upload'],
			},
		},
		routing: {
			send: {
				preSend: [
						// Handle body creation
						async function (this, requestOptions) {
							const { body } = requestOptions;
							try {
								const binaryPropertyName = this.getNodeParameter('binaryPropertyName') as string;

									const item = this.getInputData();

									if (item.binary![binaryPropertyName] === undefined) {
										throw new NodeOperationError(
											this.getNode(),
											`No binary data property “${binaryPropertyName}” exists on item!`,
										);
									}

									const bufferFromIncomingData = await this.helpers.getBinaryDataBuffer(
										binaryPropertyName,
									);

									const {
										data: content,
										// mimeType,
										// fileName,
										// fileExtension,
									} = await this.helpers.prepareBinaryData(bufferFromIncomingData);

									// const itemIndex = this.getItemIndex();
									Object.assign(body!, {content: content});

								return requestOptions;
							} catch (err) {
								throw new NodeOperationError(this.getNode(), err);
							}
						},
				],
			},
		},
	},
];


export const uploadFields: INodeProperties[] = [
	...uploadOperationFields,
];
