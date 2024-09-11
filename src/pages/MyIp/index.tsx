import { Card, Col, Descriptions, Empty, Row, Skeleton } from 'antd';
import axios from 'axios';
import React from 'react';
import { CloudflareIpResponse } from './interfaces';
import { useRequest } from 'ahooks';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

export const MyIp: React.FC = () => {
  const { data, loading, error } = useRequest(() => {
    return axios.get<CloudflareIpResponse>(`${import.meta.env.VITE_CLOUDFLARE_IP_URL}/meta`);
  });

  return (
    <Card>
      <Skeleton active loading={loading}>
        {data?.data ? (
          <Row gutter={[16, 24]}>
            <Col span={24}>
              <Descriptions
                bordered
                layout="vertical"
                items={[
                  { key: 'ip', label: 'Endereço IP', children: data?.data.clientIp },
                  { key: 'org', label: 'Provedora', children: data?.data.asOrganization },
                  { key: 'asn', label: 'Sistema autônomo (ASN)', children: data?.data.asn },
                ]}
              ></Descriptions>
            </Col>
            <Col span={12}>
              <Descriptions
                bordered
                layout="horizontal"
                items={[
                  { key: 'country', label: 'País', children: data?.data.country },
                  { key: 'region', label: 'Estado', children: data?.data.region },
                  { key: 'city', label: 'Cidade', children: data?.data.city },
                  { key: 'postalCode', label: 'CEP', children: data?.data.postalCode },
                ]}
              ></Descriptions>
            </Col>
            <Col span={12}>
              <MapContainer
                center={[Number(data?.data.latitude) || 0, Number(data?.data.longitude) || 0]}
                zoom={15}
                style={{ height: '30em' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[Number(data?.data.latitude) || 0, Number(data?.data.longitude) || 0]}></Marker>
              </MapContainer>
            </Col>
          </Row>
        ) : (
          <Empty description={error?.message}></Empty>
        )}
      </Skeleton>
    </Card>
  );
};
