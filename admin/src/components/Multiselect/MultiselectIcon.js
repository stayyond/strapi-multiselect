import React from 'react';
import styled from 'styled-components';
import { Icon } from '@strapi/design-system/Icon';
import { Flex } from '@strapi/design-system/Flex';
import Duplicate from '@strapi/icons/Duplicate';

const IconBox = styled(Flex)`
  /* Hard code color values */
  /* to stay consistent between themes */
  background-color: #FFFAE6; /* primary100 */
  border: 1px solid #FFFAE6; /* primary200 */

  svg > path {
    fill: #960528; /* primary600 */
  }
`;

const MultiselectIcon = () => {
  return (
    <IconBox justifyContent="center" alignItems="center" width={7} height={6} hasRadius aria-hidden>
      <Icon as={Duplicate} />
    </IconBox>
  );
};

export default MultiselectIcon;