import { Grid, GridItem, SystemProps, SystemStyleObject } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function GridContainer({
    mainContent,
    sideContent,
    sx = {},
    gap = 8
}: {
    mainContent: ReactNode;
    sideContent: ReactNode;
    sx?: SystemStyleObject;
    gap?: SystemProps['gap'];
}) {
    return (
        <Grid templateColumns='repeat(12, 1fr)' gap={gap} sx={sx}>
            <GridItem colSpan={8}>{mainContent}</GridItem>
            <GridItem colSpan={4}>{sideContent}</GridItem>
        </Grid>
    );
}
