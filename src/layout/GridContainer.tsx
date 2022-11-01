import { Grid, GridItem, SystemStyleObject } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function GridContainer({
    mainContent,
    sideContent,
    sx = {}
}: {
    mainContent: ReactNode;
    sideContent: ReactNode;
    sx?: SystemStyleObject;
}) {
    return (
        <Grid templateColumns='repeat(12, 1fr)' gap={8} sx={sx}>
            <GridItem colSpan={8}>{mainContent}</GridItem>
            <GridItem colSpan={4}>{sideContent}</GridItem>
        </Grid>
    );
}
