import React from 'react';
import Edit from './edit';
  
const EditWrap = (props) => {

  function findWine(wine) {
    return wine.id === props.params.wineId;
  }

  const currentWine = props.wines.find(findWine);

  return (
    <div>
      <Edit wine={currentWine} regions={props.regions} categories={props.categories} onEditSave={props.onEditSave}/>
    </div>
    
  );
};

EditWrap.propTypes = { 
  wines: React.PropTypes.array,
  categories: React.PropTypes.array,
  regions: React.PropTypes.array
};

export default EditWrap;

