import React from 'react';
import styled from 'styled-components';

const RouterLoadingWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RouterLoading = (
    <RouterLoadingWrapper>
        <div>Loading...</div>
    </RouterLoadingWrapper>
);
