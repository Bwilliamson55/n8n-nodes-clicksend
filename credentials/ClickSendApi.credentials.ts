import type {
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export class ClickSendApi implements ICredentialType {
	name = 'clickSendApi';

	displayName = 'ClickSend API';

	documentationUrl = 'https://developers.clicksend.com/docs/rest/v3/#introduction';

	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			placeholder: 'API or account username',
			default: '',
		},
		{
			displayName: 'API Key or Password',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const token = Buffer.from(`${credentials.username}:${credentials.apiKey}`).toString('base64');
		requestOptions.headers = {
			...requestOptions.headers,
			Authorization: `Basic ${token}`,
		};
		return requestOptions;
	}

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://rest.clicksend.com/v3',
			url: '/account',
			method: 'GET',
		},
	};
}
