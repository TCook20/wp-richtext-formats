import { registerFormatType } from '@wordpress/rich-text';
import classnames from 'classnames';
import edit from './edit';

registerFormatType( 'mizzou/material-icon', {
	title: 'Material Icon',
	tagName: 'i',
	className: 'material-icons',
	edit,
} );
