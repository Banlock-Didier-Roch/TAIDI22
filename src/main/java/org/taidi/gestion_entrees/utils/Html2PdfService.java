package org.taidi.gestion_entrees.utils;

import org.springframework.core.io.InputStreamResource;

import java.util.Map;

public interface Html2PdfService {

    InputStreamResource generateFacture(Map<String, Object> data);
}
