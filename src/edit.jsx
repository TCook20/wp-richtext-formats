import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Button, Modal } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { applyFormat, create, insert } from '@wordpress/rich-text';

import axios from 'axios';

const EditMaterialIcon = ( { isActive, onChange, value } ) => {
	const [ responseData, setResponseData ] = useState();
	const [ iconList, setIconList ] = useState( [] );
	const [ showPopover, setShowPopover ] = useState( false );

	let iconGallery;
	const iconMap = [];

	const codepointsUrl =
		'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints';

	useEffect( () => {
		axios
			.get( codepointsUrl )
			.then( ( response ) =>
				setResponseData( response.data.split( '\n' ) )
			)
			.catch( ( error ) => {
				console.log( 'Error fetching and parsing data', error );
			} );
	}, [] );

	if ( responseData ) {
		responseData.map( ( line ) => {
			const entry = line.split( ' ' );
			iconMap.push( entry[ 0 ] );
		} );
	}

	useEffect( () => {
		setIconList( iconMap );
	}, [ iconMap ] );

	const iconSelectorHandler = ( selectedValue ) => {
		setShowPopover( false );

		const toInsert = applyFormat(
			create( { text: selectedValue } ),
			{
				type: 'mizzou/material-icon',
			},
			0,
			selectedValue.length
		);

		onChange( insert( value, toInsert ) );
	};

	if ( iconList ) {
		iconGallery = iconList.map( ( icon, i ) => (
			<Button
				size="compact"
				key={ i }
				label={ icon }
				onClick={ () => iconSelectorHandler( icon ) }
			>
				<i className="miz-icon miz-icon--xl material-icons">{ icon }</i>
			</Button>
		) );
	}

	const onClickEvent = () => {
		setShowPopover( true );
	};

	return (
		<>
			<RichTextToolbarButton
				icon="carrot"
				title="Material Icon"
				onClick={ onClickEvent }
				isActive={ isActive }
			/>
			{ showPopover && (
				<Modal
					title={ 'Material Icons' }
					onRequestClose={ () => setShowPopover( false ) }
				>
					<>
						<p>Select an icon to insert.</p>
						{ iconGallery }
					</>
				</Modal>
			) }
		</>
	);
};

export default EditMaterialIcon;

EditMaterialIcon.propTypes = {};
