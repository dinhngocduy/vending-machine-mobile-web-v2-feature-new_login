#!/bin/bash

# Start scripte
NOW=$(date +"%m-%d-%Y %H:%M:%S")
echo 'Start Feature'
echo -e "Please enter your feature: "
read name
echo -e "Please enter description your feature: "
read description
echo -e "Please enter your author name: "
read AUTHOR
COPPYRIGHT="/* 
    Created by ${AUTHOR} at ${NOW}
    Màn hình ${description}
*/"
echo 'Create feature'

SOURCEDIR="src/features/$name"
echo $SOURCEDIR
mkdir "$SOURCEDIR"
chmod -R 777 "$SOURCEDIR"


upper_name=""
upper_all_name=""
if [[ $name == *"-"* ]]; then
  echo "co dau _"
  IFS='-' # hyphen (-) is set as delimiter
  read -ra ADDR <<< "$name" # str is read into an array as tokens separated by IFS
  for i in "${ADDR[@]}"; do # access each element of array
    echo ${i}
    upper_tmp="$(tr '[:lower:]' '[:upper:]' <<< ${i:0:1})${i:1}"
    upper_all_tmp="$(tr '[:lower:]' '[:upper:]' <<< "$i")"
    upper_name=${upper_name}${upper_tmp}
    if [ "$upper_all_name" == "" ]; then
      upper_all_name="${upper_all_name}${upper_all_tmp}"
    else
      upper_all_name="${upper_all_name}_${upper_all_tmp}"
    fi
    
  done
  IFS=' ' #
else
  upper_name="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"
  upper_all_name="$(tr '[:lower:]' '[:upper:]' <<< "$name")"
fi





# Generate index
touch "$SOURCEDIR/index.ts"
echo "
${COPPYRIGHT}

import ${upper_name}Container from 'features/${name}/view/${name}.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({
   
});

export const ${upper_name}Screen = connect(mapStateToProps, mapDispatchToProps)(${upper_name}Container)

" >> "$SOURCEDIR/index.ts"
echo 'Finist parent'


# Generate folder View
echo 'Start folder View'
mkdir "$SOURCEDIR/view"
mkdir "$SOURCEDIR/view/components"
touch "$SOURCEDIR/view/$name.screen.tsx"

echo "${COPPYRIGHT}

import * as React from \"react\";
import { View, StyleSheet } from \"react-native\";
import { ContainerComponent } from \"libraries/main/container/container.component\";
import { "${upper_name}"Props, ${upper_name}Adapter } from \"../model\";

export default class "${upper_name}"Container extends React.PureComponent<
  "${upper_name}"Props
> {
  ${upper_name}Adapter: ${upper_name}Adapter
  //Local States

  constructor(props: "${upper_name}"Props) {
    super(props);
    this.${upper_name}Adapter = new ${upper_name}Adapter(this)
  }

  render() {
    return (
      <ContainerComponent style={styles.container} showBackBtn>

      </ContainerComponent>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {},
});

" >> "$SOURCEDIR/view/$name.screen.tsx"

# Generate folder Model

echo 'Start Model'
mkdir "$SOURCEDIR/model"

# Interface
touch "$SOURCEDIR/model/$name.entity.ts"
echo "
${COPPYRIGHT}

import { ISchema, IPattern } from \"networking/ApiHelper\";

" >> "$SOURCEDIR/model/$name.entity.ts"

# Prop
touch "$SOURCEDIR/model/$name.props.ts"
echo "
${COPPYRIGHT}

import { NavigationParams, NavigationScreenProp, NavigationState } from \"react-navigation\";

export interface ${upper_name}Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}
" >> "$SOURCEDIR/model/$name.props.ts"

# Adapter
touch "$SOURCEDIR/model/$name.adapter.ts"
echo "
${COPPYRIGHT}

import { Dispatch } from \"redux\";
import ${upper_name}Container from \"../view/${name}.screen\";

export class ${upper_name}Adapter {
  ${upper_name}Container: ${upper_name}Container;
  constructor(Container: ${upper_name}Container) {
    this.${upper_name}Container = Container;
  }
}


" >> "$SOURCEDIR/model/$name.adapter.ts"

# Service
touch "$SOURCEDIR/model/$name.services.ts"
echo "
${COPPYRIGHT}

import { fetch, post, put, deletes } from \"networking/ApiHelper\"

export default class ${upper_name}Services {
  private static instance: ${upper_name}Services;

  static getInstance(): ${upper_name}Services {
    if (!${upper_name}Services.instance) {
      ${upper_name}Services.instance = new ${upper_name}Services();
    }
    return ${upper_name}Services.instance;
  }
}

" >> "$SOURCEDIR/model/$name.services.ts"


# Index - Model
touch "$SOURCEDIR/model/index.ts"
echo "
${COPPYRIGHT}

export * from \"./${name}.adapter\"
export * from \"./${name}.entity\"
export * from \"./${name}.props\"
export * from \"./${name}.services\"

" >> "$SOURCEDIR/model/index.ts"

echo 'End Model'

# import Screen name
SCREEN_NAME_PATH="src/routers/ScreenName.ts"
echo "export const ${upper_name}Screen = \"${upper_name}Screen\"; // Màn hình ${description}" >> ${SCREEN_NAME_PATH}

# import file Navigator
# SCREEN_NAVIGATOR="src/routers/HomeNavigator.ts"
# old_text="import  as screenNames from \"./screenNames\";"
# echo 'old_text' $old_text
# APPEND_TEXT="import { ${upper_name}Screen } from \"features/${name}\";"
# SCREEN_NAVIGATOR_CONTENT=""
# while IFS= read -r line
# do  
#     # echo "line " $line
#     if [[ $line = *"as screenNames"* ]];
#     then 
    
#     SCREEN_NAVIGATOR_CONTENT="${SCREEN_NAVIGATOR_CONTENT}"$'\n'"${old_text}"$'\n'"${APPEND_TEXT}";
#     else SCREEN_NAVIGATOR_CONTENT="${SCREEN_NAVIGATOR_CONTENT}"$'\n'"${line}";
#     fi
# done < $SCREEN_NAVIGATOR
# echo ${SCREEN_NAVIGATOR_CONTENT}
# echo ${SCREEN_NAVIGATOR_CONTENT} > $SCREEN_NAVIGATOR

echo "End Scripts"
