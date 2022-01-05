import { Link, useParams } from "react-router-dom";
import { Params } from "Routes";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useUser } from "hooks/authHooks";

interface AddCoreSetCardProps {
  title: string;
  buttonText: string;
  to: string;
  coreSetExists: boolean;
}

export const AddCoreSetCard = ({
  title,
  buttonText,
  to,
  coreSetExists,
}: AddCoreSetCardProps) => {
  const { isStateUser } = useUser();
  const { state, year } = useParams<Params>();

  return (
    <CUI.Box
      as="aside"
      borderRadius="base"
      borderWidth="thin"
      borderLeftWidth="1rem"
      borderLeftColor="blue.500"
      minW="363px"
      p="6"
    >
      <CUI.Stack spacing="6">
        <CUI.Text fontWeight="bold">{title}</CUI.Text>
        <Link
          to={`/${state}/${year}/${to}`}
          style={{
            textDecoration: "none",
          }}
        >
          <QMR.ContainedButton
            disabledStatus={!isStateUser}
            icon="plus"
            buttonText={!coreSetExists ? buttonText : "Already Added"}
            disabledStatus={coreSetExists}
            buttonProps={{
              colorScheme: "blue",
              textTransform: "capitalize",
              variant: "outline",
            }}
          />
        </Link>
      </CUI.Stack>
    </CUI.Box>
  );
};

interface Props {
  childCoreSetExists: boolean;
  healthHomesCoreSetExists: boolean;
}

export const AddCoreSetCards = ({
  childCoreSetExists,
  healthHomesCoreSetExists,
}: Props) => {
  return (
    <>
      <AddCoreSetCard
        title="Need to report on Child data?"
        buttonText="Add Child Core Set"
        to="add-child"
        coreSetExists={childCoreSetExists}
      />
      <AddCoreSetCard
        title="Need to report on Health Homes data?"
        buttonText="Add Health Homes Core Set"
        to="add-hh"
        coreSetExists={healthHomesCoreSetExists}
      />
      <CUI.Center w="44" textAlign="center">
        <CUI.Text fontStyle="italic" fontSize="sm">
          Only one group of Adult Core Set Measures can be submitted per FFY
        </CUI.Text>
      </CUI.Center>
    </>
  );
};
