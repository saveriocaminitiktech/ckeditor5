import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

export default class FetchUploadAdapter extends Plugin {
	static get requires() {
		return [ FileRepository ];
	}

	static get pluginName() {
		return 'FetchUploadAdapter';
	}

	init() {
		const options = this.editor.config.get( 'fetchUpload' );

		if ( !options ) {
			return;
		}

		if ( !options.uploadUrl ) {
			// eslint-disable-next-line no-undef
			console.warn( 'fetchUpload config is missing' );

			return;
		}

		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => {
			return new FetchAdapter( loader, options );
		};
	}
}

class FetchAdapter {
	constructor( loader, options ) {
		this.loader = loader;
		this.options = options;
	}

	upload() {
		return this.loader.file
			.then( file => this.sendWithFetch( file ) );
	}

	abort() {
		if ( this.controller ) {
			this.controller.abort();
		}
	}

	sendWithFetch( file ) {
		// eslint-disable-next-line no-undef
		this.controller = new AbortController();

		const simpleFilename = file.name.replace( /[^A-Za-z0-9.-]/, '_' );
		const h = this.options.headers;
		h.accept = 'application/json, text/plain, */*';
		h[ 'content-disposition' ] = 'attachment;filename="' + simpleFilename + '"';

		// eslint-disable-next-line no-undef
		return fetch( this.options.uploadUrl, {
			method: 'POST',
			signal: this.controller.signal,
			body: file,
			headers: h
		} )
			.then( response => response.json() )
			.then( data => ( { default: data.file } ) );
	}
}
