import {
  faArrowTrendUp,
  faBan,
  faHourglass,
  faMap,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {currentRegionState} from '../../../../recoils/currentRegion';
import {selectedGeofenceState} from '../../../../recoils/selectedRegion';
import {CommonText} from '../../../common/CommonText';
import {RegionPolicy} from '../../../region/RegionPolicy/RegionPolicy';
import {RegionPolicyItem} from '../../../region/RegionPolicy/RegionPolicyItem';
import {MainHomeSheetCommonProps} from './MainHomeSheet';

export const MainHomeSheetRegion: React.FC<MainHomeSheetCommonProps> = ({}) => {
  const selectedRegion = useRecoilValue(currentRegionState);
  const selectedGeofence = useRecoilValue(selectedGeofenceState);
  const pricing = selectedRegion?.region.pricing;

  if (!selectedGeofence) return <></>;
  return (
    <View style={{padding: 3, width: '100%'}}>
      <RegionName>{selectedGeofence.profile.name}</RegionName>
      <Title>
        <FontAwesomeIcon icon={faMap} size={25} />{' '}
        {selectedGeofence.name.replace(/_/, ' ').replace(/^[0-9]|[0-9]$/, '')}
      </Title>
      <RegionPolicy>
        {selectedGeofence.profile.speed && (
          <RegionPolicyItem
            icon={faHourglass}
            title="속도 제한"
            details={`${selectedGeofence.profile.speed}km`}
          />
        )}
        {selectedGeofence.profile.canReturn && (
          <RegionPolicyItem
            icon={faBan}
            title="반납 불가"
            details="반납할 수 없습니다."
          />
        )}
        {selectedGeofence.profile.hasSurcharge &&
          pricing?.surchargePrice! > 0 && (
            <RegionPolicyItem
              icon={faArrowTrendUp}
              title="벌금 발생"
              details={
                pricing ? `${pricing.surchargePrice.toLocaleString()}원` : ''
              }
            />
          )}
      </RegionPolicy>
    </View>
  );
};

const RegionName = styled(CommonText)`
  color: #999;
  font-weight: 600;
  font-size: ${screenHeight / 45}px;
`;

const Title = styled(CommonText)`
  font-size: ${screenHeight / 30}px;
  font-weight: 300,
  color: #0a0c0c
`;
