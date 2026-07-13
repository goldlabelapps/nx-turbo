"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import { useDispatch } from "../../NX/Uberedux";
import {Score} from "../../Virus";
import { getFirebaseFirestore } from "../utils/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { CleverText, Icon, navigateTo } from "../../NX/DesignSystem";

export default function Viruses() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [viruses, setViruses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firestore = getFirebaseFirestore();
    const q = query(collection(firestore, "viruses"), orderBy("score", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setViruses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <Box>
      {loading && <CleverText options={{
        markdown: "Loading...",
        id: "loading",
        onFinish: () => {
          // Optionally handle finish
        }
      }} />}
      {!loading && viruses.length > 0 && (
        <Box display="flex" flexDirection="column" gap={3}>

        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{flexGrow:1}} />
          <Button
            variant='outlined'
            startIcon={<Icon icon="new" />}
            onClick={() => {
              dispatch(navigateTo(router, '/viruses/new'));
            }}
          >
            New
          </Button>              
        </Box>
          
          {viruses.map((virus, idx) => (
            <Box
              key={virus.id}
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push(`/viruses/${virus.id}`)}
            >
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Score score={virus.score ?? 0} />
                  }
                  title={<Typography variant="h6">{virus.name}</Typography>}
                  subheader={<Typography variant="subtitle2" color="text.secondary">Created {virus.created ? moment(virus.created).fromNow() : ''}</Typography>}
                />
                  {idx === 0 && (
                    <CardContent>
                      <CleverText options={{
                        markdown: virus.message,
                        id: virus.id,
                        onFinish: () => {
                          // Optionally handle finish
                        }
                      }} />
                    </CardContent>
                  )}
              </Card>
            </Box>
          ))}
        </Box>
      )}
      {!loading && viruses.length === 0 && (
        <Typography color="text.secondary">No viruses found.</Typography>
      )}
    </Box>
  );
}