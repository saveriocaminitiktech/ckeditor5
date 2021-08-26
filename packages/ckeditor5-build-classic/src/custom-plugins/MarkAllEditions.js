import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';


const allEditionCfg = {
	withText: true,
	label: 'All DOB',
	tooltip: true
};

export default class MarkAllEditions extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'markAllEditions', locale => {
			const view = new ButtonView( locale );
			view.set( allEditionCfg );

			// Callback executed once the button is clicked
			view.on( 'execute', () => {
				editor.execute( 'fontBackgroundColor' );
			} );
			return view;
		} );
	}
}
