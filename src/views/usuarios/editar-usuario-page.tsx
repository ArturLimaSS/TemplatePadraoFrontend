import { TabContext, TabPanel } from '@mui/lab';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router';
import PageContainer from 'src/components/container/PageContainer';
import { EditarUsuario } from 'src/components/usuarios/editar-usuario';

const EditarUsuarioPage = () => {
  const location = useLocation();
  const usuario = location?.state?.usuario;

  const tabs = [
    { nome: 'Dados de acesso', component: <EditarUsuario usuario={usuario} /> },
    { nome: 'Módulos', component: <div>Módulos</div> },
  ];

  const [selectedTab, setSelectedTab] = useState('0');

  return (
    <PageContainer title="Editar Usuario" description="Pagina de edicao de usuario">
      <TabContext value={selectedTab}>
        <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(String(v))}>
          {tabs.map((tab, index) => (
            <Tab key={index} value={String(index)} label={tab.nome} />
          ))}
        </Tabs>

        {tabs.map((tab, index) => (
          <TabPanel key={index} value={String(index)}>
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </PageContainer>
  );
};

export default EditarUsuarioPage;
